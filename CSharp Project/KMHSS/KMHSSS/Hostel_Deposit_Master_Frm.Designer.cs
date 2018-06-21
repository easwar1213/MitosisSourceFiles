namespace KMHSSS
{
    partial class Hostel_Deposit_Master_Frm
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
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Hostel_Deposit_Fees_Master_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.Deposit_Txt = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.label13 = new System.Windows.Forms.Label();
            this.HD_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.HD_Id_Txt = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.Update_Btn = new System.Windows.Forms.Button();
            this.Save_Btn = new System.Windows.Forms.Button();
            this.Clear_Btn = new System.Windows.Forms.Button();
            this.Delete_Btn = new System.Windows.Forms.Button();
            this.Alert_Msg_Lbl = new System.Windows.Forms.Label();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Hostel_Deposit_Fees_Master_dataGridView1)).BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(506, 73);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(89, 28);
            this.EYear_Txt.TabIndex = 5;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Hostel_Deposit_Fees_Master_dataGridView1);
            this.groupBox3.ForeColor = System.Drawing.Color.Black;
            this.groupBox3.Location = new System.Drawing.Point(29, 202);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(618, 265);
            this.groupBox3.TabIndex = 1;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Hostel_Deposit_Fees_Master_dataGridView1
            // 
            this.Hostel_Deposit_Fees_Master_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Hostel_Deposit_Fees_Master_dataGridView1.Location = new System.Drawing.Point(27, 34);
            this.Hostel_Deposit_Fees_Master_dataGridView1.Name = "Hostel_Deposit_Fees_Master_dataGridView1";
            this.Hostel_Deposit_Fees_Master_dataGridView1.Size = new System.Drawing.Size(567, 208);
            this.Hostel_Deposit_Fees_Master_dataGridView1.TabIndex = 0;
            this.Hostel_Deposit_Fees_Master_dataGridView1.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.Hostel_Deposit_Fees_Master_dataGridView1_CellClick);
            // 
            // Deposit_Txt
            // 
            this.Deposit_Txt.ForeColor = System.Drawing.Color.Black;
            this.Deposit_Txt.Location = new System.Drawing.Point(131, 121);
            this.Deposit_Txt.Name = "Deposit_Txt";
            this.Deposit_Txt.Size = new System.Drawing.Size(164, 28);
            this.Deposit_Txt.TabIndex = 7;
            this.Deposit_Txt.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Deposit_Txt_KeyDown);
            this.Deposit_Txt.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.Deposit_Txt_KeyPress);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.ForeColor = System.Drawing.Color.Black;
            this.label8.Location = new System.Drawing.Point(25, 123);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(63, 21);
            this.label8.TabIndex = 61;
            this.label8.Text = "Deposit";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.Alert_Msg_Lbl);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.ForeColor = System.Drawing.Color.Black;
            this.groupBox1.Location = new System.Drawing.Point(25, 36);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(828, 508);
            this.groupBox1.TabIndex = 16;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Hostel Deposit Master";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.Deposit_Txt);
            this.groupBox2.Controls.Add(this.label8);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.label13);
            this.groupBox2.Controls.Add(this.HD_Date_Dtp);
            this.groupBox2.Controls.Add(this.HD_Id_Txt);
            this.groupBox2.Controls.Add(this.label4);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox2.ForeColor = System.Drawing.Color.Black;
            this.groupBox2.Location = new System.Drawing.Point(28, 25);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(619, 173);
            this.groupBox2.TabIndex = 0;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Hostel Deposit Master";
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(406, 72);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(94, 29);
            this.SYear_CBox.TabIndex = 4;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            this.SYear_CBox.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.SYear_CBox_KeyPress);
            this.SYear_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.SYear_CBox_KeyDown);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(314, 75);
            this.label6.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(54, 21);
            this.label6.TabIndex = 58;
            this.label6.Text = "AYear";
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(131, 74);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(164, 29);
            this.Class_CBox.TabIndex = 3;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(28, 77);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 54;
            this.label13.Text = "Class";
            // 
            // HD_Date_Dtp
            // 
            this.HD_Date_Dtp.CalendarForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.HD_Date_Dtp.CalendarTitleForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.HD_Date_Dtp.CalendarTrailingForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.HD_Date_Dtp.Enabled = false;
            this.HD_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.HD_Date_Dtp.Location = new System.Drawing.Point(406, 29);
            this.HD_Date_Dtp.Name = "HD_Date_Dtp";
            this.HD_Date_Dtp.Size = new System.Drawing.Size(188, 28);
            this.HD_Date_Dtp.TabIndex = 2;
            this.HD_Date_Dtp.Value = new System.DateTime(2014, 12, 27, 7, 1, 40, 0);
            // 
            // HD_Id_Txt
            // 
            this.HD_Id_Txt.Enabled = false;
            this.HD_Id_Txt.ForeColor = System.Drawing.SystemColors.MenuHighlight;
            this.HD_Id_Txt.Location = new System.Drawing.Point(132, 29);
            this.HD_Id_Txt.Name = "HD_Id_Txt";
            this.HD_Id_Txt.Size = new System.Drawing.Size(163, 28);
            this.HD_Id_Txt.TabIndex = 1;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.ForeColor = System.Drawing.Color.Black;
            this.label4.Location = new System.Drawing.Point(314, 31);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(74, 21);
            this.label4.TabIndex = 2;
            this.label4.Text = "HD Date";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.ForeColor = System.Drawing.Color.Black;
            this.label2.Location = new System.Drawing.Point(28, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(57, 21);
            this.label2.TabIndex = 0;
            this.label2.Text = "HD Id";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Black;
            this.label1.Location = new System.Drawing.Point(345, 11);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(221, 27);
            this.label1.TabIndex = 17;
            this.label1.Text = "Hostel Deposit Master";
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.Close_Btn);
            this.groupBox4.Controls.Add(this.Update_Btn);
            this.groupBox4.Controls.Add(this.Save_Btn);
            this.groupBox4.Controls.Add(this.Clear_Btn);
            this.groupBox4.Controls.Add(this.Delete_Btn);
            this.groupBox4.ForeColor = System.Drawing.Color.Black;
            this.groupBox4.Location = new System.Drawing.Point(667, 24);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(135, 444);
            this.groupBox4.TabIndex = 16;
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
            this.Alert_Msg_Lbl.Location = new System.Drawing.Point(373, 476);
            this.Alert_Msg_Lbl.Name = "Alert_Msg_Lbl";
            this.Alert_Msg_Lbl.Size = new System.Drawing.Size(124, 23);
            this.Alert_Msg_Lbl.TabIndex = 115;
            this.Alert_Msg_Lbl.Text = "Alert Message";
            // 
            // Hostel_Deposit_Master_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(878, 565);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label1);
            this.Name = "Hostel_Deposit_Master_Frm";
            this.Text = "Hostel Deposit Master";
            this.Load += new System.EventHandler(this.Hostel_Deposit_Master_Frm_Load);
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Hostel_Deposit_Fees_Master_dataGridView1)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Hostel_Deposit_Fees_Master_dataGridView1;
        private System.Windows.Forms.TextBox Deposit_Txt;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.DateTimePicker HD_Date_Dtp;
        private System.Windows.Forms.TextBox HD_Id_Txt;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Button Update_Btn;
        private System.Windows.Forms.Button Save_Btn;
        private System.Windows.Forms.Button Clear_Btn;
        private System.Windows.Forms.Button Delete_Btn;
        private System.Windows.Forms.Label Alert_Msg_Lbl;
    }
}