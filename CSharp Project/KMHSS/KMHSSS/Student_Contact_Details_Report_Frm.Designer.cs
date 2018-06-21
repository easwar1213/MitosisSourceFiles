namespace KMHSSS
{
    partial class Student_Contact_Details_Report_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.View_Btn = new System.Windows.Forms.Button();
            this.Section_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.crystalReportViewer1 = new CrystalDecisions.Windows.Forms.CrystalReportViewer();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(830, 21);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 56);
            this.View_Btn.TabIndex = 267;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Section_CHBox
            // 
            this.Section_CHBox.AutoSize = true;
            this.Section_CHBox.Location = new System.Drawing.Point(602, 38);
            this.Section_CHBox.Name = "Section_CHBox";
            this.Section_CHBox.Size = new System.Drawing.Size(82, 25);
            this.Section_CHBox.TabIndex = 266;
            this.Section_CHBox.Text = "Section";
            this.Section_CHBox.UseVisualStyleBackColor = true;
            this.Section_CHBox.CheckedChanged += new System.EventHandler(this.Section_CHBox_CheckedChanged);
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(338, 37);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(64, 25);
            this.Class_CHBox.TabIndex = 265;
            this.Class_CHBox.Text = "Class";
            this.Class_CHBox.UseVisualStyleBackColor = true;
            this.Class_CHBox.CheckedChanged += new System.EventHandler(this.Class_CHBox_CheckedChanged);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(417, 35);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(158, 29);
            this.Class_CBox.TabIndex = 221;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(33, 37);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(73, 25);
            this.AYear_CHBox.TabIndex = 264;
            this.AYear_CHBox.Text = "AYear";
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            this.AYear_CHBox.CheckedChanged += new System.EventHandler(this.AYear_CHBox_CheckedChanged);
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(690, 37);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(102, 29);
            this.Sec_CBox.TabIndex = 222;
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(211, 35);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(97, 28);
            this.EYear_Txt.TabIndex = 260;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(107, 35);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(95, 29);
            this.SYear_CBox.TabIndex = 261;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.crystalReportViewer1);
            this.groupBox2.Location = new System.Drawing.Point(25, 119);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1254, 540);
            this.groupBox2.TabIndex = 19;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Report";
            // 
            // crystalReportViewer1
            // 
            this.crystalReportViewer1.ActiveViewIndex = -1;
            this.crystalReportViewer1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.crystalReportViewer1.Location = new System.Drawing.Point(35, 43);
            this.crystalReportViewer1.Name = "crystalReportViewer1";
            this.crystalReportViewer1.SelectionFormula = "";
            this.crystalReportViewer1.Size = new System.Drawing.Size(1188, 469);
            this.crystalReportViewer1.TabIndex = 31;
            this.crystalReportViewer1.ViewTimeSelectionFormula = "";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(30, 44);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1307, 687);
            this.groupBox1.TabIndex = 39;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Contact Details Report";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.View_Btn);
            this.groupBox3.Controls.Add(this.Section_CHBox);
            this.groupBox3.Controls.Add(this.Class_CHBox);
            this.groupBox3.Controls.Add(this.Class_CBox);
            this.groupBox3.Controls.Add(this.AYear_CHBox);
            this.groupBox3.Controls.Add(this.Sec_CBox);
            this.groupBox3.Controls.Add(this.EYear_Txt);
            this.groupBox3.Controls.Add(this.SYear_CBox);
            this.groupBox3.Controls.Add(this.Close_Btn);
            this.groupBox3.Location = new System.Drawing.Point(159, 27);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(966, 88);
            this.groupBox3.TabIndex = 33;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Select";
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(830, 22);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(84, 56);
            this.Close_Btn.TabIndex = 3;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(569, 16);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(305, 27);
            this.label9.TabIndex = 40;
            this.label9.Text = "Student Contact Details Report";
            // 
            // Student_Contact_Details_Report_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Student_Contact_Details_Report_Frm";
            this.Text = "Student Contact Details Report";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Student_Contact_Details_Report_Frm_Load);
            this.groupBox2.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.CheckBox Section_CHBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.GroupBox groupBox2;
        private CrystalDecisions.Windows.Forms.CrystalReportViewer crystalReportViewer1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Label label9;

    }
}