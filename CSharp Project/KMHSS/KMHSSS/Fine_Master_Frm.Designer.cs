namespace KMHSSS
{
    partial class Fine_Master_Frm
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
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.label13 = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Fine_Master_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.FM_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.FM_Id_Txt = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.Fine_Amt_Txt = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.Update_Btn = new System.Windows.Forms.Button();
            this.Save_Btn = new System.Windows.Forms.Button();
            this.Clear_Btn = new System.Windows.Forms.Button();
            this.Delete_Btn = new System.Windows.Forms.Button();
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Fine_Master_dataGridView1)).BeginInit();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(146, 75);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(136, 29);
            this.Class_CBox.TabIndex = 3;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(20, 80);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 54;
            this.label13.Text = "Class";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Fine_Master_dataGridView1);
            this.groupBox3.ForeColor = System.Drawing.Color.Black;
            this.groupBox3.Location = new System.Drawing.Point(26, 204);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(598, 265);
            this.groupBox3.TabIndex = 1;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Fine_Master_dataGridView1
            // 
            this.Fine_Master_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Fine_Master_dataGridView1.Location = new System.Drawing.Point(25, 34);
            this.Fine_Master_dataGridView1.Name = "Fine_Master_dataGridView1";
            this.Fine_Master_dataGridView1.Size = new System.Drawing.Size(549, 206);
            this.Fine_Master_dataGridView1.TabIndex = 0;
            this.Fine_Master_dataGridView1.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.Fine_Master_dataGridView1_CellClick);
            // 
            // FM_Date_Dtp
            // 
            this.FM_Date_Dtp.CalendarForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.FM_Date_Dtp.CalendarTitleForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.FM_Date_Dtp.CalendarTrailingForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.FM_Date_Dtp.Enabled = false;
            this.FM_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.FM_Date_Dtp.Location = new System.Drawing.Point(385, 29);
            this.FM_Date_Dtp.Name = "FM_Date_Dtp";
            this.FM_Date_Dtp.Size = new System.Drawing.Size(188, 28);
            this.FM_Date_Dtp.TabIndex = 2;
            this.FM_Date_Dtp.Value = new System.DateTime(2014, 12, 27, 7, 1, 40, 0);
            // 
            // FM_Id_Txt
            // 
            this.FM_Id_Txt.Enabled = false;
            this.FM_Id_Txt.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.FM_Id_Txt.Location = new System.Drawing.Point(147, 29);
            this.FM_Id_Txt.Name = "FM_Id_Txt";
            this.FM_Id_Txt.Size = new System.Drawing.Size(135, 28);
            this.FM_Id_Txt.TabIndex = 1;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.ForeColor = System.Drawing.Color.Black;
            this.label4.Location = new System.Drawing.Point(298, 31);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(73, 21);
            this.label4.TabIndex = 2;
            this.label4.Text = "FM Date";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.ForeColor = System.Drawing.Color.Black;
            this.label3.Location = new System.Drawing.Point(19, 127);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(100, 21);
            this.label3.TabIndex = 1;
            this.label3.Text = "Fine Amount";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.ForeColor = System.Drawing.Color.Black;
            this.label2.Location = new System.Drawing.Point(23, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(56, 21);
            this.label2.TabIndex = 0;
            this.label2.Text = "FM Id";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.label13);
            this.groupBox2.Controls.Add(this.FM_Date_Dtp);
            this.groupBox2.Controls.Add(this.Fine_Amt_Txt);
            this.groupBox2.Controls.Add(this.FM_Id_Txt);
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.label3);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox2.ForeColor = System.Drawing.Color.Black;
            this.groupBox2.Location = new System.Drawing.Point(25, 25);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(598, 175);
            this.groupBox2.TabIndex = 0;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Fine Master";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(481, 76);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(95, 28);
            this.EYear_Txt.TabIndex = 5;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(385, 76);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(90, 29);
            this.SYear_CBox.TabIndex = 4;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.SYear_CBox_KeyPress);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(298, 79);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(54, 21);
            this.label6.TabIndex = 58;
            this.label6.Text = "AYear";
            // 
            // Fine_Amt_Txt
            // 
            this.Fine_Amt_Txt.ForeColor = System.Drawing.Color.Black;
            this.Fine_Amt_Txt.Location = new System.Drawing.Point(146, 125);
            this.Fine_Amt_Txt.Name = "Fine_Amt_Txt";
            this.Fine_Amt_Txt.Size = new System.Drawing.Size(136, 28);
            this.Fine_Amt_Txt.TabIndex = 6;
            this.Fine_Amt_Txt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Fine_Amt_Txt_KeyDown);
            this.Fine_Amt_Txt.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.Fine_Amt_Txt_KeyPress);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.ForeColor = System.Drawing.Color.Black;
            this.groupBox1.Location = new System.Drawing.Point(22, 30);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(804, 512);
            this.groupBox1.TabIndex = 16;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Fine Master";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Black;
            this.label1.Location = new System.Drawing.Point(357, 5);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(124, 27);
            this.label1.TabIndex = 17;
            this.label1.Text = "Fine Master";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Close_Btn);
            this.groupBox4.Controls.Add(this.Update_Btn);
            this.groupBox4.Controls.Add(this.Save_Btn);
            this.groupBox4.Controls.Add(this.Clear_Btn);
            this.groupBox4.Controls.Add(this.Delete_Btn);
            this.groupBox4.ForeColor = System.Drawing.Color.Black;
            this.groupBox4.Location = new System.Drawing.Point(643, 25);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(135, 444);
            this.groupBox4.TabIndex = 18;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Operations";
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.ForeColor = System.Drawing.Color.Black;
            this.Close_Btn.Location = new System.Drawing.Point(16, 360);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(95, 60);
            this.Close_Btn.TabIndex = 15;
            this.Close_Btn.Text = "Clos&e";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // Update_Btn
            // 
            this.Update_Btn.ForeColor = System.Drawing.Color.Black;
            this.Update_Btn.Location = new System.Drawing.Point(18, 112);
            this.Update_Btn.Name = "Update_Btn";
            this.Update_Btn.Size = new System.Drawing.Size(95, 60);
            this.Update_Btn.TabIndex = 13;
            this.Update_Btn.Text = "&Update";
            this.Update_Btn.UseVisualStyleBackColor = true;
            this.Update_Btn.Click += new System.EventHandler(this.Update_Btn_Click);
            // 
            // Save_Btn
            // 
            this.Save_Btn.ForeColor = System.Drawing.Color.Black;
            this.Save_Btn.Location = new System.Drawing.Point(17, 34);
            this.Save_Btn.Name = "Save_Btn";
            this.Save_Btn.Size = new System.Drawing.Size(95, 60);
            this.Save_Btn.TabIndex = 12;
            this.Save_Btn.Text = "&Save";
            this.Save_Btn.UseVisualStyleBackColor = true;
            this.Save_Btn.Click += new System.EventHandler(this.Save_Btn_Click);
            // 
            // Clear_Btn
            // 
            this.Clear_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Clear_Btn.ForeColor = System.Drawing.Color.Black;
            this.Clear_Btn.Location = new System.Drawing.Point(15, 275);
            this.Clear_Btn.Name = "Clear_Btn";
            this.Clear_Btn.Size = new System.Drawing.Size(95, 60);
            this.Clear_Btn.TabIndex = 7;
            this.Clear_Btn.Text = "&Clear";
            this.Clear_Btn.UseVisualStyleBackColor = true;
            this.Clear_Btn.Click += new System.EventHandler(this.Clear_Btn_Click);
            // 
            // Delete_Btn
            // 
            this.Delete_Btn.ForeColor = System.Drawing.Color.Black;
            this.Delete_Btn.Location = new System.Drawing.Point(16, 193);
            this.Delete_Btn.Name = "Delete_Btn";
            this.Delete_Btn.Size = new System.Drawing.Size(95, 60);
            this.Delete_Btn.TabIndex = 6;
            this.Delete_Btn.Text = "&Delete";
            this.Delete_Btn.UseVisualStyleBackColor = true;
            this.Delete_Btn.Click += new System.EventHandler(this.Delete_Btn_Click);
            // 
            // Alert_Msg_Lbl
            // 
            this.Alert_Msg_Lbl.AutoSize = true;
            this.Alert_Msg_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Alert_Msg_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(325, 477);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 117;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // Fine_Master_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(849, 564);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label1);
            this.Name = "Fine_Master_Frm";
            this.Text = "Fine Master";
            this.Load += new System.EventHandler(this.Fine_Master_Frm_Load);
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Fine_Master_dataGridView1)).EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Fine_Master_dataGridView1;
        private System.Windows.Forms.DateTimePicker FM_Date_Dtp;
        private System.Windows.Forms.TextBox FM_Id_Txt;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox Fine_Amt_Txt;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Button Update_Btn;
        private System.Windows.Forms.Button Save_Btn;
        private System.Windows.Forms.Button Clear_Btn;
        private System.Windows.Forms.Button Delete_Btn;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
    }
}