namespace KMHSSS
{
    partial class Student_Admission_Details_Frm
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
            this.label1 = new System.Windows.Forms.Label();
            this.Student_Admission_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.To_Admis_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Dayscholar_CHBox = new System.Windows.Forms.CheckBox();
            this.Van_CHBox = new System.Windows.Forms.CheckBox();
            this.Hostel_CHBox = new System.Windows.Forms.CheckBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.Section_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.Date_CHBox = new System.Windows.Forms.CheckBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.Frm_Admis_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.Print_Lbl = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.Student_Admission_dataGridView1)).BeginInit();
            this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(992, 39);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(76, 21);
            this.label1.TabIndex = 34;
            this.label1.Text = " To Date";
            // 
            // Student_Admission_dataGridView1
            // 
            this.Student_Admission_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Student_Admission_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Student_Admission_dataGridView1.Location = new System.Drawing.Point(21, 33);
            this.Student_Admission_dataGridView1.Name = "Student_Admission_dataGridView1";
            this.Student_Admission_dataGridView1.Size = new System.Drawing.Size(1233, 423);
            this.Student_Admission_dataGridView1.TabIndex = 6;
            this.Student_Admission_dataGridView1.VirtualMode = true;
            this.Student_Admission_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Student_Admission_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // To_Admis_Date_Dtp
            // 
            this.To_Admis_Date_Dtp.CustomFormat = "";
            this.To_Admis_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.To_Admis_Date_Dtp.Location = new System.Drawing.Point(1074, 35);
            this.To_Admis_Date_Dtp.Name = "To_Admis_Date_Dtp";
            this.To_Admis_Date_Dtp.Size = new System.Drawing.Size(104, 28);
            this.To_Admis_Date_Dtp.TabIndex = 2;
            this.To_Admis_Date_Dtp.Value = new System.DateTime(2014, 5, 24, 0, 0, 0, 0);
            this.To_Admis_Date_Dtp.KeyDown += new System.Windows.Forms.KeyEventHandler(this.To_Admis_Date_Dtp_KeyDown);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Student_Admission_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(23, 116);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1276, 482);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.Dayscholar_CHBox);
            this.groupBox2.Controls.Add(this.Van_CHBox);
            this.groupBox2.Controls.Add(this.Hostel_CHBox);
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.Section_CHBox);
            this.groupBox2.Controls.Add(this.Class_CHBox);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.Sec_CBox);
            this.groupBox2.Controls.Add(this.Date_CHBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.To_Admis_Date_Dtp);
            this.groupBox2.Controls.Add(this.label1);
            this.groupBox2.Controls.Add(this.Frm_Admis_Date_Dtp);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Location = new System.Drawing.Point(23, 22);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1279, 88);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // Dayscholar_CHBox
            // 
            this.Dayscholar_CHBox.AutoSize = true;
            this.Dayscholar_CHBox.Location = new System.Drawing.Point(662, 38);
            this.Dayscholar_CHBox.Name = "Dayscholar_CHBox";
            this.Dayscholar_CHBox.Size = new System.Drawing.Size(107, 25);
            this.Dayscholar_CHBox.TabIndex = 270;
            this.Dayscholar_CHBox.Text = "Dayscholar";
            this.Dayscholar_CHBox.UseVisualStyleBackColor = true;
            // 
            // Van_CHBox
            // 
            this.Van_CHBox.AutoSize = true;
            this.Van_CHBox.Location = new System.Drawing.Point(597, 38);
            this.Van_CHBox.Name = "Van_CHBox";
            this.Van_CHBox.Size = new System.Drawing.Size(55, 25);
            this.Van_CHBox.TabIndex = 269;
            this.Van_CHBox.Text = "Van";
            this.Van_CHBox.UseVisualStyleBackColor = true;
            // 
            // Hostel_CHBox
            // 
            this.Hostel_CHBox.AutoSize = true;
            this.Hostel_CHBox.Location = new System.Drawing.Point(513, 38);
            this.Hostel_CHBox.Name = "Hostel_CHBox";
            this.Hostel_CHBox.Size = new System.Drawing.Size(75, 25);
            this.Hostel_CHBox.TabIndex = 264;
            this.Hostel_CHBox.Text = "Hostel";
            this.Hostel_CHBox.UseVisualStyleBackColor = true;
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1185, 25);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 47);
            this.View_Btn.TabIndex = 267;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Section_CHBox
            // 
            this.Section_CHBox.AutoSize = true;
            this.Section_CHBox.Location = new System.Drawing.Point(378, 37);
            this.Section_CHBox.Name = "Section_CHBox";
            this.Section_CHBox.Size = new System.Drawing.Size(55, 25);
            this.Section_CHBox.TabIndex = 266;
            this.Section_CHBox.Text = "Sec";
            this.Section_CHBox.UseVisualStyleBackColor = true;
            this.Section_CHBox.CheckedChanged += new System.EventHandler(this.Section_CHBox_CheckedChanged);
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(233, 38);
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
            this.Class_CBox.Location = new System.Drawing.Point(297, 35);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(71, 29);
            this.Class_CBox.TabIndex = 221;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(10, 37);
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
            this.Sec_CBox.Location = new System.Drawing.Point(439, 34);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(59, 29);
            this.Sec_CBox.TabIndex = 222;
            // 
            // Date_CHBox
            // 
            this.Date_CHBox.AutoSize = true;
            this.Date_CHBox.Location = new System.Drawing.Point(777, 38);
            this.Date_CHBox.Name = "Date_CHBox";
            this.Date_CHBox.Size = new System.Drawing.Size(106, 25);
            this.Date_CHBox.TabIndex = 263;
            this.Date_CHBox.Text = "From Date";
            this.Date_CHBox.UseVisualStyleBackColor = true;
            this.Date_CHBox.CheckedChanged += new System.EventHandler(this.Date_CHBox_CheckedChanged);
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(159, 35);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(64, 28);
            this.EYear_Txt.TabIndex = 260;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(84, 35);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(70, 29);
            this.SYear_CBox.TabIndex = 261;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // Frm_Admis_Date_Dtp
            // 
            this.Frm_Admis_Date_Dtp.CustomFormat = "";
            this.Frm_Admis_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.Frm_Admis_Date_Dtp.Location = new System.Drawing.Point(887, 36);
            this.Frm_Admis_Date_Dtp.Name = "Frm_Admis_Date_Dtp";
            this.Frm_Admis_Date_Dtp.Size = new System.Drawing.Size(104, 28);
            this.Frm_Admis_Date_Dtp.TabIndex = 1;
            this.Frm_Admis_Date_Dtp.Value = new System.DateTime(2014, 5, 24, 0, 0, 0, 0);
            this.Frm_Admis_Date_Dtp.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Frm_Admis_Date_Dtp_KeyDown);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(1185, 25);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(84, 47);
            this.Close_Btn.TabIndex = 3;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(511, 12);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(253, 27);
            this.label9.TabIndex = 21;
            this.label9.Text = "Student Admission Details";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(22, 46);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1323, 647);
            this.groupBox1.TabIndex = 20;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Information";
            // 
            // Alert_Msg_Lbl
            // 
            this.Alert_Msg_Lbl.AutoSize = true;
            this.Alert_Msg_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Alert_Msg_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(523, 612);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 267;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // Print_Lbl
            // 
            this.Print_Lbl.AutoSize = true;
            this.Print_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Print_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Print_Lbl.Location = new System.Drawing.Point(1221, 16);
            this.Print_Lbl.Name = "Print_Lbl";
            this.Print_Lbl.Size = new System.Drawing.Size(124, 27);
            this.Print_Lbl.TabIndex = 119;
            this.Print_Lbl.Text = "Print Report";
            this.Print_Lbl.Click += new System.EventHandler(this.Print_Lbl_Click);
            // 
            // Student_Admission_Details_Frm
            // 
            this.AcceptButton = this.View_Btn;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.Print_Lbl);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Student_Admission_Details_Frm";
            this.Text = "Student Admission Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Student_Admission_Details_Frm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.Student_Admission_dataGridView1)).EndInit();
            this.groupBox3.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.DataGridView Student_Admission_dataGridView1;
        private System.Windows.Forms.DateTimePicker To_Admis_Date_Dtp;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.DateTimePicker Frm_Admis_Date_Dtp;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.CheckBox Date_CHBox;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.CheckBox Section_CHBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.CheckBox Hostel_CHBox;
        private System.Windows.Forms.CheckBox Van_CHBox;
        private System.Windows.Forms.CheckBox Dayscholar_CHBox;
        private System.Windows.Forms.Label Print_Lbl;
    }
}